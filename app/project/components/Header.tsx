"use client";
import {
  Container,
  Heading,
  HStack,
  Icon,
  Status,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";

import { Activity } from "lucide-react";

export function ProjectHeader({
  title,
  slogan,
  status,
}: {
  title: string;
  slogan: string;
  status: "online" | "offline";
}) {
  return (
    <HStack
      as={"header"}
      color="white"
      boxShadow="md"
      // bgGradient={"to-r"}
      // gradientFrom={"#41b883"}
      // gradientTo={"#2179b5"}
    >
      {/* Top Gradient Bar */}
      <Container m={"auto"} px={{ sm: 6, base: 4, lg: 8 }} py={6}>
        <HStack justify={"space-between"} alignItems={"center"}>
          <HStack gap={3}>
            <Icon
              borderRadius={8}
              size={"lg"}
              h={24}
              w={32}
              border={"2px solid rgba(255, 0, 0, 1)"}
            >
              <svg
                role="img"
                viewBox="0 -5 24 35"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>YouTube ELI5</title>

                <text
                  x="12"
                  y="8"
                  textAnchor="middle"
                  fontSize="6"
                  fontFamily="Arial, sans-serif"
                  fill="rgba(255, 0, 0, 1)"
                  fontWeight="bold"
                >
                  ELI5
                </text>

                <path
                  d="M23.498 14.186a3.016 3.016 0 0 0-2.122-2.136C19.505 11.545 12 11.545 12 11.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 14.186C0 16.07 0 20 0 20s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 23.93 24 20 24 20s0-3.93-.502-5.814zM9.545 23.568V16.432L15.818 20l-6.273 3.568z"
                  fill="rgba(255, 0, 0, 1)"
                />
              </svg>
            </Icon>
            <VStack alignItems={"start"}>
              <Heading size={"3xl"} fontWeight={"bold"} m={0} p={0}>
                {title || "Project Name"}
                <Text fontWeight={"medium"} textStyle={"lg"} color="#2179b5">
                  {slogan}
                </Text>
              </Heading>
            </VStack>
          </HStack>

          <HStack justify={"space-between"}>
            <Tag.Root rounded={"full"}>
              <Status.Root>
                <Status.Indicator
                  colorPalette={status === "online" ? "green" : "red"}
                />
                <Icon
                  as={Activity}
                  color={status === "online" ? "green" : "red"}
                />
                Status {status === "online" ? "Online" : "Offline"}
              </Status.Root>
            </Tag.Root>
          </HStack>
        </HStack>
      </Container>
    </HStack>
  );
}
