package pyclient

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

// Client は Python サーバーとの通信インターフェースです。
type Client interface {
	// GetSummary は指定の URL に対して要約をリクエストし、結果の summary を返します。
	GetSummary(ctx context.Context, url string) (string, error)
	GetRecommends(ctx context.Context, url string) ([]*RecommendItem, error)
}

type client struct {
	baseURL    string
	httpClient *http.Client
}

// NewClient は Python サーバーとのクライアントを生成します。
func NewClient(baseURL string) Client {
	return &client{
		baseURL: baseURL,
		httpClient: &http.Client{
			Timeout: 60 * time.Second,
			// この変更で、長い時間のレスポンスにも対応
			Transport: &http.Transport{
				ResponseHeaderTimeout: 60 * time.Second, // レスポンスヘッダー受信タイムアウトを 90秒 に設定 (例)
			},
		},
	}
}

func (c *client) GetSummary(ctx context.Context, url string) (string, error) {
	reqData := SummaryRequest{URL: url}
	reqBody, err := json.Marshal(reqData)
	if err != nil {
		return "", fmt.Errorf("failed to marshal request data: %w", err)
	}

	endpoint := fmt.Sprintf("%s/summaries", c.baseURL)
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, endpoint, bytes.NewBuffer(reqBody))
	if err != nil {
		return "", fmt.Errorf("failed to create request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")

	// リクエスト送信
	resp, err := c.httpClient.Do(req)
	if err != nil {
		return "", fmt.Errorf("failed to perform request: %w", err)
	}
	defer resp.Body.Close()

	// ステータスコードが 200 OK であることを確認
	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("unexpected status code %d: %s", resp.StatusCode, string(body))
	}

	// レスポンスボディのパース
	var respData SummaryResponse
	if err := json.NewDecoder(resp.Body).Decode(&respData); err != nil {
		return "", fmt.Errorf("failed to decode response: %w", err)
	}

	return respData.Summary, nil
}

func (c *client) GetRecommends(ctx context.Context, url string) ([]*RecommendItem, error) {
	reqData := RecommendRequest{URL: url}
	reqBody, err := json.Marshal(reqData)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request data: %w", err)
	}

	endpoint := fmt.Sprintf("%s/recommends", c.baseURL)
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, endpoint, bytes.NewBuffer(reqBody))
	if err != nil {
		return nil, fmt.Errorf("failed to perform request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to perform request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return nil, fmt.Errorf("unexpected status code %d: %s", resp.StatusCode, string(body))
	}

	var respData RecommendResponse
	if err := json.NewDecoder(resp.Body).Decode(&respData); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	return respData.Recommends, nil
}
