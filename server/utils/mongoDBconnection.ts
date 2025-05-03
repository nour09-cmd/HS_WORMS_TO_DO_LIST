import mongoose from "mongoose";
import { DB_URIMONGODB } from "./conifg";

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private isConnected = false;
  private dbUri: string;

  public constructor() {
    this.dbUri = DB_URIMONGODB || "";
    if (!this.dbUri) {
      throw new Error("Database URI not found in environment variables");
    }
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async connect(): Promise<void> {
    if (this.isConnected) return;

    try {
      await mongoose.connect(this.dbUri, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      this.isConnected = true;
      console.log(`Database Connected: ${mongoose.connection.host}`);
    } catch (err) {
      console.error(`Database Connection Error: ${(err as Error).message}`);
      throw err;
    }
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) return;

    try {
      await mongoose.disconnect();
      this.isConnected = false;
      console.log("Database disconnected");
    } catch (err) {
      console.error(`Database Disconnection Error: ${(err as Error).message}`);
      throw err;
    }
  }

  public getConnectionStatus(): boolean {
    return this.isConnected;
  }
}

export { DatabaseConnection };