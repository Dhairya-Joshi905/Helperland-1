"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const celebrate_1 = require("celebrate");
const ContactUs_repository_1 = require("./2.3 ContactUsAPI/ContactUs.repository");
const ContactUs_model_1 = require("./2.3 ContactUsAPI/ContactUs.model");
const ContactUs_service_1 = require("./2.3 ContactUsAPI/ContactUs.service");
const ContactUs_controller_1 = require("./2.3 ContactUsAPI/ContactUs.controller");
const Subscribe_repository_1 = require("./2.x SubscribeAPI/Subscribe.repository");
const Subscribe_model_1 = require("./2.x SubscribeAPI/Subscribe.model");
const Subscribe_service_1 = require("./2.x SubscribeAPI/Subscribe.service");
const Subscribe_controller_1 = require("./2.x SubscribeAPI/Subscribe.controller");
const CustomerSignUp_repository_1 = require("./3.2 CustomerSignUpAPI/CustomerSignUp.repository");
const CustomerSignUp_model_1 = require("./3.2 CustomerSignUpAPI/CustomerSignUp.model");
const CustomerSignUp_service_1 = require("./3.2 CustomerSignUpAPI/CustomerSignUp.service");
const CustomerSignUp_controller_1 = require("./3.2 CustomerSignUpAPI/CustomerSignUp.controller");
const SPSignUp_repository_1 = require("./3.3 SPSignUpAPI/SPSignUp.repository");
const SPSignUp_model_1 = require("./3.3 SPSignUpAPI/SPSignUp.model");
const SPSignUp_service_1 = require("./3.3 SPSignUpAPI/SPSignUp.service");
const SPSignUp_controller_1 = require("./3.3 SPSignUpAPI/SPSignUp.controller");
const Login_repository_1 = require("./3.1 LoginAPI/Login.repository");
const Login_model_1 = require("./3.1 LoginAPI/Login.model");
const Login_service_1 = require("./3.1 LoginAPI/Login.service");
const Login_controller_1 = require("./3.1 LoginAPI/Login.controller");
const ForgotPassword_repository_1 = require("./3.4 ForgotPasswordAPI/ForgotPassword.repository");
const ForgotPassword_model_1 = require("./3.4 ForgotPasswordAPI/ForgotPassword.model");
const ForgotPassword_service_1 = require("./3.4 ForgotPasswordAPI/ForgotPassword.service");
const ForgotPassword_controller_1 = require("./3.4 ForgotPasswordAPI/ForgotPassword.controller");
const { contus_add, contus_get, contus_update } = ContactUs_model_1.ContactUsSchema;
const { subs_get, subs_add } = Subscribe_model_1.SubscribeSchema;
const { csignup_add, csignup_get, csignup_update } = CustomerSignUp_model_1.CustomerSignUpSchema;
const { spsignup_add, spsignup_get, spsignup_update } = SPSignUp_model_1.SPSignUpSchema;
const { login_check } = Login_model_1.LoginSchema;
const { reset, newpassword } = ForgotPassword_model_1.ForgotPasswordSchema;
const router = express_1.default.Router();
const contactusrepo = new ContactUs_repository_1.ContactUsRepository();
const contactusservice = new ContactUs_service_1.ContactUsService(contactusrepo);
const contactuscontroller = new ContactUs_controller_1.ContactUsController(contactusservice);
const subscriberepo = new Subscribe_repository_1.SubscribeRepository();
const subscribeservice = new Subscribe_service_1.SubscribeService(subscriberepo);
const subscribecontroller = new Subscribe_controller_1.SubscribeController(subscribeservice);
const customersignuprepo = new CustomerSignUp_repository_1.CustomerSignUpRepository();
const customersignupservice = new CustomerSignUp_service_1.CustomerSignUpService(customersignuprepo);
const customersignupcontroller = new CustomerSignUp_controller_1.CustomerSignUpController(customersignupservice);
const spsignuprepo = new SPSignUp_repository_1.SPSignUpRepository();
const spsignupservice = new SPSignUp_service_1.SPSignUpService(spsignuprepo);
const spsignupcontroller = new SPSignUp_controller_1.SPSignUpController(spsignupservice);
const loginrepo = new Login_repository_1.LoginRepository();
const loginservice = new Login_service_1.LoginService(loginrepo);
const logincontroller = new Login_controller_1.LoginController(loginservice);
const forgotpasswordrepo = new ForgotPassword_repository_1.ForgotPasswordRepository();
const forgotpasswordservice = new ForgotPassword_service_1.ForgotPasswordService(forgotpasswordrepo);
const forgotpasswordcontroller = new ForgotPassword_controller_1.ForgotPasswordController(forgotpasswordservice);
router.post('/ContactUs', (0, celebrate_1.celebrate)(contus_add), contactuscontroller.createContactUs);
router.get('/ContactUs/:id', (0, celebrate_1.celebrate)(contus_get), contactuscontroller.getContactUsById);
router.get('/ContactUs', contactuscontroller.getAllContactUs);
router.put('/ContactUs/:id', (0, celebrate_1.celebrate)(contus_update), contactuscontroller.updateContactUs);
router.delete('/ContactUs/:id', (0, celebrate_1.celebrate)(contus_get), contactuscontroller.deleteContactUs);
router.post('/Subscribe', (0, celebrate_1.celebrate)(subs_add), subscribecontroller.saveSubscriber);
//router.post('/Subscribe', celebrate(subadd), subscribecontroller.sendEmail);
//router.post('/Subscribe', celebrate(subadd), subscribecontroller.sendEmailToAll);
router.get('/Subscribe/:id', (0, celebrate_1.celebrate)(subs_get), subscribecontroller.getSubscriberById);
router.get('/Subscribe', subscribecontroller.getAllSubscribers);
router.post('/CustomerSignUp', (0, celebrate_1.celebrate)(csignup_add), customersignupcontroller.createCustomerSignUp);
router.get('/CustomerSignUp/:id', (0, celebrate_1.celebrate)(csignup_get), customersignupcontroller.getCustomerSignUpById);
router.get('/CustomerSignUp', customersignupcontroller.getAllCustomerSignUp);
router.put('/CustomerSignUp/:id', (0, celebrate_1.celebrate)(csignup_update), customersignupcontroller.updateCustomerSignUp);
router.delete('/CustomerSignUp/:id', (0, celebrate_1.celebrate)(csignup_get), customersignupcontroller.deleteCustomerSignUp);
router.post('/SPSignUp', (0, celebrate_1.celebrate)(spsignup_add), spsignupcontroller.createSPSignUp);
router.get('/SPSignUp/:id', (0, celebrate_1.celebrate)(spsignup_get), spsignupcontroller.getSPSignUpById);
router.get('/SPSignUp', spsignupcontroller.getAllSPSignUp);
router.put('/SPSignUp/:id', (0, celebrate_1.celebrate)(spsignup_update), spsignupcontroller.updateSPSignUp);
router.delete('/SPSignUp/:id', (0, celebrate_1.celebrate)(spsignup_get), spsignupcontroller.deleteSPSignUp);
router.post('/login', (0, celebrate_1.celebrate)(login_check), logincontroller.Login);
router.post('/ForgotPassword', (0, celebrate_1.celebrate)(reset), forgotpasswordcontroller.forgotPassword);
router.post('/ResetPassword', (0, celebrate_1.celebrate)(newpassword), forgotpasswordcontroller.resetPassword);
module.exports = router;
