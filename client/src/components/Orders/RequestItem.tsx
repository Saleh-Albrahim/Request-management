import { Button, ComponentWithAs, IconProps, Text, VStack } from '@chakra-ui/react';
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons';

const buttonStyle: any = {
  height: '125px',
  width: '220px',
  fontSize: '20px',
  backgroundColor: '#F0F0F0',
  borderRadius: '5px',
  boxShadow: 'base',
  _hover: { boxShadow: 'lg' },
};

interface Props {
  value: string;
  Icon: ComponentWithAs<'svg', IconProps>;
}

const RequestItem: React.FC<Props> = ({ value, Icon }) => (
  <Button {...buttonStyle} rounded="md">
    <VStack>
      <Icon color="gray" w={7} h={7} mb={3} />
      <Text color="gray" fontSize="20px">
        {value}
      </Text>
    </VStack>
  </Button>
);

export default RequestItem;
