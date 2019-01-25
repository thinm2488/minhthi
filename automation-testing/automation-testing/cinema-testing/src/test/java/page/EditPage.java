package page;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import static common.TestReport.testReport;
import static java.lang.Thread.sleep;

public class EditPage {
    WebDriver driver;
    WebDriverWait wait;

    public EditPage(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements(driver, this);
        this.wait = new WebDriverWait(driver, 15);
    }

    public boolean verifyEditPage(String email) {

        try {
            sleep(2000);
        } catch (Exception e) {
        }
        WebElement Email = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("body > b > div > class=\"row\" > div.row > div:nth-child(3) > form > div:nth-child(1) > label > b > b")));
        String ten=Email.getText().trim();
        System.out.println(ten);
        boolean check = Email.getText().trim().equals(email);
        try {
            sleep(1000);
        } catch (Exception e) {
        }
        testReport(driver, check, "Expected: Edit Profile Page", true);
        return check;
    }
    public void Inputname(String name){
        WebElement nhapTen=wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("body > b > div > class=\"row\" > div.row > div:nth-child(3) > form > div:nth-child(2) > input")));
        nhapTen.sendKeys(name);
        try {
            sleep(1000);
        } catch (Exception e) {
        }
        testReport(driver, true, "Expected: Edit Profile Page", true);
        WebElement buttonLuu = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("body > b > div > class=\"row\" > div.row > div:nth-child(3) > button")));
        buttonLuu.click();
        try {
            sleep(2000);
        } catch (Exception e) {
        }
        driver.switchTo().alert().accept();
        try {
            sleep(2000);
        } catch (Exception e) {
        }
    }


}