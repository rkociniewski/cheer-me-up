import { UserDataAttributesRequest, UserDataRequest } from '../CognitoSchema';
import { authenticateUser, registerUser, updateUser, deleteUser } from '../service/CognitoService';

export default {
  authorize: (userData: UserDataRequest) => authenticateUser(userData),
  register: (userData: UserDataRequest) => registerUser(userData),
  update: (userData: UserDataAttributesRequest) => updateUser(userData),
  delete: (userData: UserDataRequest) => deleteUser(userData),
};
