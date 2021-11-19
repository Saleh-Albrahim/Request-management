import { Button } from '@chakra-ui/react';

interface Props {
  updateScene: (value: string) => void;
  value: string;
  currentScene: string;
}

const SideBarItem = ({ updateScene, currentScene, value }: Props) => {
  let selected;
  if (value === currentScene) {
    selected = {
      borderColor: 'black',
      color: 'black',
      border: '2px solid',
    };
  } else {
    selected = {
      borderColor: 'gray1',
      color: '#595959',
      border: 'none',
    };
  }
  return (
    <Button {...selected} variant="sidebar-button" onClick={(e: any) => updateScene(e.target.innerText)}>
      {value}
    </Button>
  );
};

export default SideBarItem;
