import React, { useState } from 'react';
import { Button, List, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import EditTag from './Edit';

import { functionCaller } from '@/utils';

const ListOfTag = ({ tags = [], onSuccessEdit }) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [tagId, setTagId] = useState(null);

  const closeUpdateModal = () => {
    setOpenUpdate(false);
  };

  return (
    <>
      <Modal
        destroyOnClose
        title="Update tag"
        visible={openUpdate}
        onCancel={closeUpdateModal}
        footer={false}
      >
        {tagId ? (
          <EditTag
            tagId={tagId}
            onCallbackSuccess={() => {
              closeUpdateModal();
              functionCaller(onSuccessEdit);
            }}
          />
        ) : null}
      </Modal>
      <List
        itemLayout="horizontal"
        dataSource={tags}
        renderItem={tag => (
          <List.Item
            actions={[
              <Button
                icon={<EditOutlined />}
                onClick={() => {
                  setTagId(tag.id);
                  setOpenUpdate(true);
                }}
                type="link"
                key={tag.id}
              >
                Edit
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={tag.title}
              description={
                <div>
                  Meta title: {tag.metaTitle}
                  <br />
                  Slug: {tag.slug}
                </div>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default ListOfTag;
