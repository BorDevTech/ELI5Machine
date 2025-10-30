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
import { useState } from "react";

export function ProjectHeader({
  title,
  slogan,
}: {
  title: string;
  slogan: string;
}) {
  const [statusCheck, setStatusCheck] = useState<"online" | "offline">(
    "online"
  ); // Placeholder for actual status check logic
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
            <Icon borderRadius={3} size={"lg"} h={12} w={12} p={2}>
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="rgba(255, 0, 0, 1)"
              >
                <title>YouTube</title>
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
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
                <Status.Indicator colorPalette={"green"} />
                <Icon as={Activity} color={"green"} />
                Status {statusCheck === "online" ? "Online" : "Offline"}
              </Status.Root>
            </Tag.Root>
          </HStack>
        </HStack>
      </Container>
    </HStack>
  );
}
