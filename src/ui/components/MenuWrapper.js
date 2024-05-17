import {useState} from 'react';
import {IconButton, Menu} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import {theme} from '../core';

export default function MenuWrapper(props) {
    const [visible, setVisible] = useState(false);
    const closeMenu = () => setVisible(false);
    const openMenu = () => setVisible(true);
    const {menu} = props;
    return (
        <Menu
            theme={theme}
            visible={visible}
            onDismiss={closeMenu}
            anchor={
                <IconButton
                    {...props}
                    icon={() => <FontAwesomeIcon icon={faEllipsisVertical}/>}
                    onPress={openMenu}
                ></IconButton>
            }
        >
            {menu.map((item, _index) => {
                return <Menu.Item key={_index} {...item} />;
            })}
        </Menu>
    );
}

const styles = StyleSheet.create({
    divider: {
        height: 1,
        color: 'black',
        width: '100%',
    },
    item: {
        backgroundColor: theme.colors.elevation.level1,
    },
});
