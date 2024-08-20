import { urlValidationService } from "@/service/urlValidationService";
import { AvailableSocialMedia } from "@/types/social-media";

describe("Testing LinkValidationService", () => {
  it("If the parameter 'socialMedia' is not valid should throw a error", () => {
    expect(() =>
      urlValidationService("randomValue" as AvailableSocialMedia, ""),
    ).toThrowError("Invalid Social Media!");
  });

  it("Should return an error object if the value is empty", () => {
    expect(urlValidationService("frontendmentor", "")).toEqual({
      status: true,
      message: "Can’t be empty",
    });
  });

  it("Should return an error object if the value is incorrect", () => {
    expect(urlValidationService("facebook", "https//random.com.mx")).toEqual({
      status: true,
      message: "Please check the URL",
    });
  });

  it("Should return an object with status 'false' if the value is valid", () => {
    expect(
      urlValidationService("twitter", "https://twitter.com/johndoe"),
    ).toEqual({
      status: false,
      message: "",
    });

    expect(
      urlValidationService("facebook", "https://www.facebook.com/DiegoPz03/"),
    ).toEqual({
      status: false,
      message: "",
    });
  });
});
