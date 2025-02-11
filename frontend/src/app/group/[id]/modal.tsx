"use client";

import { useState } from "react";
import { usePostIdea } from "@/hooks/usePostIdea";
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
  FormHelperText,
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
  users?: FetchUsersResponse;
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  title: string;
  url?: string;
  createdBy: string;
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
  eventId,
  users,
  isOpen,
  onClose,
}: AddKinaruModalProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [form, setForm] = useState<FormState>({
    createdBy: "",
    title: "",
    url: "",
    tag: IdeaTag.LOCATION,
  });
  const isTitleEmpty = form.title.trim() === "";
  const { mutate: createIdea, data, error } = usePostIdea();
  const handleChange = (e: FormEvent) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async () => {
    createIdea({
      eventId: eventId,
      ideaData: form,
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>気になるを追加</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs
            index={selectedTab}
            onChange={setSelectedTab}
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
                        value={form.createdBy}
                        onChange={handleChange}
                      >
                        {users?.users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
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
            <Button onClick={onClose} variant="outline">
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
