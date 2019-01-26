package test;

import org.testng.annotations.Test;
import page.EditProfilePage;
import page.HomePage;
import page.ProfilePage;
import page.SignUpPage;

import java.util.Random;

import static common.TestReport.handleExceptionAndMarkFailResult;
import static org.testng.Assert.assertEquals;

public class EditProfile extends TestBase{
    @Test
    public void testEditProfile() {
        try {

            Random rd = new Random();
            float floatNumber = rd.nextFloat();
            String name= "thi"+floatNumber;
            String email= floatNumber + "@gmail.com";
            String password="111111";

            HomePage homePage = new HomePage(driver);
            testResult *= homePage.verifyHomePage() ? 1 : 0 ;
            homePage.goToPageSignUp();
            SignUpPage signupPage= new SignUpPage(driver) ;
            testResult *= signupPage.verifySignup() ? 1 : 0 ;
            signupPage.createUser(name,email,password);
            testResult *= homePage.verifyHomePage() ? 1 : 0 ;
            homePage.VerifySignin(name);
            testResult*= homePage.verifyHomePage() ? 1: 0 ;
            homePage.goToPageProfile();
            ProfilePage profilePage=new ProfilePage(driver);
            testResult*= profilePage.verifyProfilePage(name) ? 1:0;
            profilePage.clickGoToEditPage();
            EditProfilePage editPage=new EditProfilePage(driver);
            testResult*= editPage.verifyEditPage(email) ? 1 : 0;
            editPage.inputinfomation(password);
            editPage.clickGoToHomePage();
            testResult*= homePage.VerifySignin(name+password)? 1: 0;
            homePage.goToPageProfile();
            testResult*= profilePage.verifyProfilePage(name+password) ? 1:0;


        } catch (Exception ex) {
            handleExceptionAndMarkFailResult(driver, ex);
        } finally {
            assertEquals(testResult, 1);
        }
    }
}
