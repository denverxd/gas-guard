export const handleCommonErrorRequest = data => {
  if (
    data.errorData == 'Network Error' ||
    data.errorData.includes('code 404') ||
    data.errorData.includes('code 500')
  ) {
    Alert.alert(
      'Network Error',
      'Please check your internet connection or contact developer.',
    );
    return true;
  }

  return false;
};
