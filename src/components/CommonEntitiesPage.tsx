import { useState } from 'react';
import { CommonEntitiesManager } from './CommonEntitiesManager';
import { CommonEntityDetailsModal } from './CommonEntityDetailsModal';
import { CommonEntityDeleteModal } from './CommonEntityDeleteModal';
import type { CommonEntity } from '../types';
import { toast } from 'react-hot-toast';

interface CommonEntitiesPageProps {
  entities: CommonEntity[];
  onDeleteEntity: (id: string) => void;
  onUpdateEntity: (id: string, updates: Partial<CommonEntity>) => void;
  onAddEntity: (entity: Omit<CommonEntity, 'id'>) => void;
  isChecking: boolean;
  onCheckSelected: (entities: CommonEntity[]) => Promise<void>;
  blacklistEntries: any[]; // Add this prop to include blacklist entries
}

export function CommonEntitiesPage({
  entities,
  onDeleteEntity,
  onUpdateEntity,
  onAddEntity,
  isChecking,
  onCheckSelected,
  blacklistEntries, // Destructure blacklistEntries from props
}: CommonEntitiesPageProps) {
  const [selectedEntity, setSelectedEntity] = useState<CommonEntity | null>(null);
  const [entityToDelete, setEntityToDelete] = useState<CommonEntity | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleDeleteEntity = (id: string) => {
    const entity = entities.find((e) => e.id === id);
    if (entity) {
      setEntityToDelete(entity);
    }
  };

  const handleEditEntity = (entity: CommonEntity) => {
    setSelectedEntity(entity);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <CommonEntitiesManager
        entities={entities}
        onDeleteEntity={handleDeleteEntity}
        isChecking={isChecking}
        onCheckSelected={onCheckSelected}
        onEditEntity={handleEditEntity}
        onAddEntity={onAddEntity}
        fetchEntities={() => {}} // Implement fetchEntities if required
      />

      {selectedEntity && (
        <CommonEntityDetailsModal
          entity={selectedEntity}
          isOpen={isModalOpen}
          onClose={() => {
            setSelectedEntity(null);
            setIsModalOpen(false);
          }}
          onSave={(updates) => {
            onUpdateEntity(selectedEntity.id, updates);
            setSelectedEntity(null);
            setIsModalOpen(false);
            toast.success('Entity updated successfully');
          }}
          onRefresh={() => {
            // Optionally implement refresh functionality
          }}
          blacklistEntries={blacklistEntries} // Pass the blacklist entries here
        />
      )}

      {entityToDelete && (
        <CommonEntityDeleteModal
          entity={entityToDelete}
          isOpen={!!entityToDelete}
          onClose={() => setEntityToDelete(null)}
          onConfirm={() => {
            onDeleteEntity(entityToDelete.id);
            setEntityToDelete(null);
            toast.success('Entity deleted successfully');
          }}
        />
      )}
    </div>
  );
}
