import React, { useState } from 'react';
import { Button, List, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import EditSocial from './Edit';

import { functionCaller } from '@/utils';

const ListOfSocial = ({ socials = [], onSuccessEdit }) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [socialId, setSocialId] = useState(null);

  const closeUpdateModal = () => {
    setOpenUpdate(false);
  };

  return (
    <>
      <Modal
        destroyOnClose
        title="Update social"
        visible={openUpdate}
        onCancel={closeUpdateModal}
        footer={false}
      >
        {socialId ? (
          <EditSocial
            socialId={socialId}
            onCallbackSuccess={() => {
              closeUpdateModal();
              functionCaller(onSuccessEdit);
            }}
          />
        ) : null}
      </Modal>
      <List
        itemLayout="horizontal"
        dataSource={socials}
        renderItem={social => (
          <List.Item
            actions={[
              <Button
                icon={<EditOutlined />}
                onClick={() => {
                  setSocialId(social.id);
                  setOpenUpdate(true);
                }}
                type="link"
                key={social.id}
              >
                Edit
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={social.name}
              description={
                <div>
                  Code: {social.code}
                  <br />
                  Link:{' '}
                  <a target="__blank" href={social.link}>
                    {social.link}
                  </a>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default ListOfSocial;
