CREATE TABLE `completedExercise` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`workoutId` integer,
	`exerciseId` integer,
	`notes` text,
	`orderNumber` integer NOT NULL,
	FOREIGN KEY (`workoutId`) REFERENCES `workout`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`exerciseId`) REFERENCES `exercise`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `workout` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`notes` text,
	`startTimestamp` integer NOT NULL,
	`duration` integer NOT NULL
);
