CREATE TABLE `schemaRepsOnly` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`completedExerciseId` integer,
	`reps` integer NOT NULL,
	`setNumber` integer NOT NULL,
	FOREIGN KEY (`completedExerciseId`) REFERENCES `completedExercise`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `schemaTimeOnly` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`completedExerciseId` integer,
	`time` integer NOT NULL,
	`setNumber` integer NOT NULL,
	FOREIGN KEY (`completedExerciseId`) REFERENCES `completedExercise`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `schemaWeightReps` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`completedExerciseId` integer,
	`weight` integer NOT NULL,
	`reps` integer NOT NULL,
	`setNumber` integer NOT NULL,
	FOREIGN KEY (`completedExerciseId`) REFERENCES `completedExercise`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `schemaWeightThrows` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`completedExerciseId` integer,
	`weight` integer NOT NULL,
	`throws` integer NOT NULL,
	`setNumber` integer NOT NULL,
	FOREIGN KEY (`completedExerciseId`) REFERENCES `completedExercise`(`id`) ON UPDATE no action ON DELETE cascade
);
