import { Progress, HStack} from "@chakra-ui/react"

export default function ExpBar({ userLevel, userExp }) {

    return (
        <Progress.Root 
            value={userExp} 
            width="100%"
            colorPalette="blue"
            variant="outline">
        <HStack gap="5">
            <Progress.Label>Lv. {userLevel} </Progress.Label>
            <Progress.Track flex="1">
            <Progress.Range 
                borderRadius="full"/>
            </Progress.Track>
            <Progress.ValueText>{userExp}/100</Progress.ValueText>
        </HStack>
        </Progress.Root>
    );
};