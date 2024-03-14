import { create } from 'zustand';
import { Model } from '../@types/conversation';
import { useMemo } from 'react';

const availableModels: {
  modelId: Model;
  label: string;
  supportMediaType: string[];
}[] = [
  {
    modelId: '***REMOVED***',
    label: 'Claude 3 (Haiku)',
    supportMediaType: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  },
  {
    modelId: '***REMOVED***',
    label: 'Claude 3 (Sonnet)',
    supportMediaType: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  },
];

const useModelState = create<{
  modelId: Model;
  setModelId: (m: Model) => void;
}>((set) => ({
  modelId: '***REMOVED***',
  setModelId: (m) => {
    set({
      modelId: m,
    });
  },
}));

const useModel = () => {
  const { modelId, setModelId } = useModelState();

  const model = useMemo(() => {
    return availableModels.find((model) => model.modelId === modelId);
  }, [modelId]);

  return {
    modelId,
    setModelId,
    model,
    disabledImageUpload: (model?.supportMediaType.length ?? 0) === 0,
    acceptMediaType:
      model?.supportMediaType.map(
        (mediaType) => `.${mediaType.split('/')[1]}`
      ) ?? [],
    availableModels,
  };
};

export default useModel;
