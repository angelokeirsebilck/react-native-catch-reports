import axios from 'axios';

const usePublicAxios = () => {
  const axiosPublic = axios.create({
    headers: {
      'x-auth-token': 'qzd',
    },
  });

  return (
    <View>
      <Text>usePublicAxios</Text>
    </View>
  );
};

export default usePublicAxios;
