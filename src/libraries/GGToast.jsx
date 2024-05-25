import {
  VStack,
  ToastDescription,
  ToastTitle,
  Toast,
} from '@gluestack-ui/themed';

const GGToast = ({toast, title, message, type = 'info'}) =>
  toast.show({
    placement: 'top',
    render: ({id}) => {
      const toastId = 'toast-' + id;
      return (
        <Toast nativeID={toastId} action={type} variant="outline">
          <VStack space="xs" flex={1}>
            <ToastTitle>New Message</ToastTitle>
            <ToastDescription>Hey,</ToastDescription>
          </VStack>
        </Toast>
      );
    },
  });
export default GGToast;
