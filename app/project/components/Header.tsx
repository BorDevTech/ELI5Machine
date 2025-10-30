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
  icon,
  title,
  slogan,
}: {
  icon: React.ElementType;
  title: string;
  slogan: string;
}) {
  const [statusCheck, setStatusCheck] = useState<"online" | "offline">(
    "online"
  ); // Placeholder for actual status check logic
  return (
    <>
      {/* Top Gradient Bar */}

      <HStack
        as={"header"}
        color="white"
        boxShadow="md"
        // bgGradient={"to-r"}
        // gradientFrom={"#41b883"}
        // gradientTo={"#2179b5"}
      >
        <Container m={"auto"} px={{ sm: 6, base: 4, lg: 8 }} py={6}>
          <HStack justify={"space-between"} alignItems={"center"}>
            <HStack gap={3}>
              <Icon
                bg={"blue.500"}
                borderRadius={3}
                size={"lg"}
                h={12}
                w={12}
                p={2}
                as={icon}
              />
              <VStack alignItems={"start"}>
                <Heading
                  size={"3xl"}
                  fontWeight={"bold"}
                  m={0}
                  p={0}
                  color={"black"}
                >
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
    </>
  );
}
