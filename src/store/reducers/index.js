// rootReducer.js

import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import AuthUserReducer from './AuthUserReducer';
import OtherReducer from './OtherReducer';
import EditProfileModalReducer from './EditProfileModalReducer';
import CropImageModalReducer from './CropImageModalReducer';
import AddEditUserModalReducer from './AddEditUserModalReducer';
import AddEditCategoriesModalReducer from './AddEditCategoriesModalReducer';
import AddEditSlidersModalReducer from './AddEditSlidersModalReducer';
import AddEditAddonsModalReducer  from './AddEditAddonsModalReducer';
import AddEditProductsModalReducer from './AddEditProductsModalReducer';
import AddEditProductsVariationModalReducer from './AddEditProductsVariationModalReducer';

const rootReducer = combineReducers({
    LoginReducer: LoginReducer,
    AuthUserReducer:AuthUserReducer,
    OtherReducer:OtherReducer,
    EditProfileModalReducer:EditProfileModalReducer,
    CropImageModalReducer:CropImageModalReducer,
    AddEditUserModalReducer:AddEditUserModalReducer,
    AddEditCategoriesModalReducer:AddEditCategoriesModalReducer,
    AddEditSlidersModalReducer:AddEditSlidersModalReducer,
    AddEditAddonsModalReducer:AddEditAddonsModalReducer,
    AddEditProductsModalReducer:AddEditProductsModalReducer,
    AddEditProductsVariationModalReducer:AddEditProductsVariationModalReducer
  // other reducers...
});

export default rootReducer;
