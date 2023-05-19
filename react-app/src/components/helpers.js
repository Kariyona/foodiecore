export const urlChecker = (image_url) => {

    if (image_url.length === 0)
    return "Image is required";

    if (
    !image_url.endsWith(".png") &&
    !image_url.endsWith(".jpg") &&
    !image_url.endsWith(".jpeg")
    ) {
    return "Image URL must end in .png, .jpg, .jpeg";
    }
    return false
}
