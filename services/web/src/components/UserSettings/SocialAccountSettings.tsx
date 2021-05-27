import { Stack, StackProps } from "@chakra-ui/react";
import * as React from "react";
import { FaGithub } from "react-icons/fa";
import { Card } from "./Card";
import { HeadingGroup } from "./HeadingGroup";
import { SocialAccount } from "./SocialAccount";

export const SocialAccountSettings = (props: StackProps) => (
  <Stack as="section" spacing="6" {...props}>
    <HeadingGroup
      title="Connected accounts"
      description="Connect your external accounts to use in Workflows"
    />
    <Card>
      <Stack spacing="5">
        <SocialAccount provider="Github" icon={FaGithub} username="batuhan" />
      </Stack>
    </Card>
  </Stack>
);
