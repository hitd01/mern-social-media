import React from 'react';
// theme
import { Modal, useMantineTheme } from '@mantine/core';
// components
import PostShare from '../../postSide/postShare/PostShare';

const ShareModal = ({ modalOpened, setModalOpened }) => {
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
            {/* note: config state with redux */}
            <PostShare />
        </Modal>
    );
};

export default ShareModal;
