import { Menu } from 'react-native-paper';
import type { ReactNode } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface PaperDropdownProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  value: any;
  anchor: ReactNode;
  values?: [any, string][];
  onSelect: (mode: any) => void;
}

export const PaperDropdown: React.FC<PaperDropdownProps> = ({
  visible,
  setVisible,
  anchor,
  value,
  values,
  onSelect,
}) => {
  return (
    <Menu
      style={{ width: 120 }}
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={anchor}
    >
      {values?.map((_item, index) => (
        <Menu.Item
          key={index}
          leadingIcon={() => (
            <Icon
              name={_item[1]}
              size={24}
              color={_item[0] === value ? 'black' : 'gray'}
            />
          )}
          onPress={() => {
            onSelect(_item[0]);
            setVisible(false);
          }}
          title={_item[0]}
        ></Menu.Item>
      ))}
    </Menu>
  );
};
