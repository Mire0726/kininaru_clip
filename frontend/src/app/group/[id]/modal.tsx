"use client";

import { useState } from "react";
import { usePostIdea } from "@/hooks/usePostIdea";
import { useQueryClient } from '@tanstack/react-query';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Select,
  Input,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
} from "@chakra-ui/react";

const categories = ["飲食店", "ホテル", "行きたい場所", "その他"];

interface FetchUsersResponse {
  users: Array<{
    id: string;
    name: string;
  }>;
}

interface AddKinaruModalProps {
  eventId: string;
  fetchUsers?: FetchUsersResponse;
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  title: string;
  url?: string;
  created_by: string;
  tag: IdeaTag;
  memo?: string;
}

enum IdeaTag {
  LOCATION = "location",
  RESTAURANT = "restaurant",
  HOTEL = "hotel",
  OTHER = "other",
}

interface FormEvent
  extends React.ChangeEvent<HTMLInputElement | HTMLSelectElement> {}

export const AddKinaruModal: React.FC<AddKinaruModalProps> = ({
  fetchUsers,
  ...props
}: AddKinaruModalProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const queryClient = useQueryClient();
  const [form, setForm] = useState<FormState>({
    created_by: "",
    title: "",
    url: "",
    tag: IdeaTag.RESTAURANT,
  });
  const clearForm = () => {
    setForm({
      created_by: "",
      title: "",
      url: "",
      tag: IdeaTag.RESTAURANT,
    });
    setSelectedTab(0);
  };
  const isTitleEmpty = form.title.trim() === "";
  const { mutate: createIdea, data, error } = usePostIdea();
  const hasUsers =
    fetchUsers && fetchUsers.users && fetchUsers.users.length > 0;
  const handleTabChange = (index: number) => {
    setSelectedTab(index);
    const newTag = (() => {
      switch (index) {
        case 0:
          return IdeaTag.RESTAURANT;
        case 1:
          return IdeaTag.HOTEL;
        case 2:
          return IdeaTag.LOCATION;
        case 3:
          return IdeaTag.OTHER;
        default:
          return IdeaTag.RESTAURANT;
      }
    })();
    setForm((prev) => ({ ...prev, tag: newTag }));
  };

  const handleChange = (e: FormEvent) => {
    const { name, value } = e.target;
    if (name === "user") {
      setForm((prev) => ({ ...prev, created_by: value }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    createIdea(
      {
        eventId: props.eventId,
        ideaData: form,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["ideas", props.eventId],
          });
          clearForm();
          props.onClose();
        },
        onError: (error) => {
          console.log(form);
          console.error("APIエラー:", error);
        },
      }
    );
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>気になるを追加</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs
            index={selectedTab}
            onChange={handleTabChange}
            variant="soft-rounded"
          >
            <TabList>
              {categories.map((category, index) => (
                <Tab key={index}>{category}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {categories.map((category, index) => (
                <TabPanel key={index}>
                  <VStack spacing={4} align="stretch">
                    <FormControl>
                      <FormLabel>
                        登録者<span style={{ color: "red" }}>*</span>
                      </FormLabel>
                      <Select
                        name="user"
                        value={form.created_by}
                        onChange={handleChange}
                        isRequired
                      >
                        <option value="">選択してください</option>
                        {hasUsers ? (
                          fetchUsers.users.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.name}
                            </option>
                          ))
                        ) : (
                          <option value="" disabled>
                            ユーザーが存在しません
                          </option>
                        )}
                      </Select>
                    </FormControl>

                    <FormControl isInvalid={isTitleEmpty}>
                      <FormLabel>
                        タイトル<span style={{ color: "red" }}>*</span>
                      </FormLabel>
                      <Input
                        name="title"
                        placeholder={`${category}の名称`}
                        value={form.title}
                        onChange={handleChange}
                      />
                      {isTitleEmpty ? (
                        <FormErrorMessage>
                          タイトルを入力してください
                        </FormErrorMessage>
                      ) : null}
                    </FormControl>

                    <FormControl>
                      <FormLabel>Google Maps URL</FormLabel>
                      <Input
                        name="mapsUrl"
                        placeholder="入力すると、プレビューやAI提案機能を使用できます"
                        value={form.url}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </VStack>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <Flex w="full" justify="space-between">
            <Button onClick={props.onClose} variant="outline">
              戻る
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              isDisabled={isTitleEmpty}
            >
              登録
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
