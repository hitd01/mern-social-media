import React from 'react';
// theme
import { Modal, useMantineTheme } from '@mantine/core';
// component
import FollowersCard from '../FollowersCard';

const FollowersModal = ({ modalOpened, setModalOpened }) => {
    const theme = useMantineTheme();

    return (
        <Modal
            overlayColor={
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[9]
                    : theme.colors.gray[2]
            }
            overlayOpacity={0.55}
            overlayBlur={3}
            size="55%"
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
        >
            <FollowersCard location="modal" />
        </Modal>
    );
};

export default FollowersModal;
