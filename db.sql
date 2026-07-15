CREATE TABLE `products` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `image` TEXT NOT NULL
);

CREATE TABLE `comments` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `post_id` INT UNSIGNED NOT NULL,
    `author` VARCHAR(255) NOT NULL,
    `comment` TEXT NOT NULL,
    FOREIGN KEY (`post_id`) REFERENCES `products` (`id`)
);
