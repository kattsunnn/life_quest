import { Accordion, Span} from "@chakra-ui/react"

const AccordionSection = ({value, title, children }) => {
    return (
        <Accordion.Item value={value}>
            <Accordion.ItemTrigger>
                <Span flex="1">{title}</Span>
                <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
                <Accordion.ItemBody>
                    {children}
                </Accordion.ItemBody>
            </Accordion.ItemContent>
        </Accordion.Item>
    )
}

export default AccordionSection