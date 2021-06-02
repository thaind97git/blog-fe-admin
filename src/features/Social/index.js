import React, { useState } from 'react';
import { Button, Modal, Skeleton } from 'antd';

import { getSocials } from '@/apis/social';

import useGet from '@/hooks/useGet';
import EmptyRecord from '@/components/Empty-Record';
import MainTitle from '@/components/Main-Title';
import CreateSocial from './components/Create';
import ListOfSocial from './components/List';

const Socials = () => {
  const [refreshSocials, setRefreshSocial] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const { data: socials, fetching: fetchingSocials } = useGet({
    func: getSocials,
    refresh: refreshSocials,
  });

  const closeCreateModal = () => setOpenCreate(false);

  if (fetchingSocials) {
    return <Skeleton />;
  }

  const SocialTitle = () => (
    <MainTitle
      title="Social management"
      actions={
        <>
          <Button type="primary" onClick={() => setOpenCreate(true)}>
            Create new Social
          </Button>
        </>
      }
    />
  );

  const socialsResult = socials?.results;

  return (
    <>
      <Modal
        title="Create new social"
        visible={openCreate}
        onCancel={closeCreateModal}
        footer={false}
      >
        <CreateSocial
          onCallbackSuccess={() => {
            closeCreateModal();
            setRefreshSocial(prev => !prev);
          }}
        />
      </Modal>

      <SocialTitle />

      {socialsResult?.length === 0 ? (
        <EmptyRecord refreshAction={() => setRefreshSocial(prev => !prev)} />
      ) : (
        <ListOfSocial
          socials={socialsResult}
          onSuccessEdit={() => setRefreshSocial(prev => !prev)}
        />
      )}
    </>
  );
};

export default Socials;
