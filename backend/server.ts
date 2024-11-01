import { ic } from "azle";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";

import { Database } from "./database";
import { UserEntity } from "./database/entities/user";

export type CreateServerOptions = {
  database: Database;
};

export function CreateServer({ database }: CreateServerOptions) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Global error handler
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Error:", err.message);
    res.status(500).send("Internal Server Error");
  });

  // Authentication guard middleware
  function AuthGuard(req: Request, res: Response, next: NextFunction) {
    if (ic.caller().isAnonymous()) {
      res.status(401).send("Unauthorized access");
    } else {
      next();
    }
  }

  // Health check endpoint
  app.get("/health", (req, res) => {
    res.sendStatus(204);
  });

  // Helper function to get user repository
  async function getUserRepository() {
    const dataSource = await database.getDataSource();
    return dataSource.getRepository(UserEntity);
  }

  // Get all users
  app.get("/users", async (req, res) => {
    try {
      const userRepository = await getUserRepository();
      const users = await userRepository.find();
      res.json(users);
    } catch (error: any) {
      res.status(400).send("Error fetching users: " + error.message);
    }
  });

  // Get current user
  app.get("/users/me", AuthGuard, async (req, res) => {
    try {
      const userRepository = await getUserRepository();
      const user = await userRepository.findOneBy({ principal: ic.caller().toString() });

      if (!user) {
        res.status(404).send("User not found");
      } else {
        res.json(user);
      }
    } catch (error: any) {
      res.status(400).send("Error fetching user: " + error.message);
    }
  });

  // Get user by ID
  app.get("/users/:id", async (req, res) => {
    try {
      const userRepository = await getUserRepository();
      const user = await userRepository.findOneBy({ id: req.params.id });

      if (!user) {
        res.status(404).send("User not found");
      } else {
        res.json(user);
      }
    } catch (error: any) {
      res.status(400).send("Error fetching user: " + error.message);
    }
  });

  // Create new user
  app.post("/users", AuthGuard, async (req: Request, res) => {
    try {
      const userRepository = await getUserRepository();

      const newUser = {
        principal: ic.caller().toString(),
        username: req.body.username,
        bio: req.body.bio,
      };

      const user = await userRepository.save(newUser);
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).send("Error creating user: " + error.message);
    }
  });

  return app.listen();
}
