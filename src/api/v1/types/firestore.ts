import { FieldValue, Timestamp } from "node_modules/firebase-admin/lib/firestore";

export type FirestoreDataTypes =
    | string
    | number
    | boolean
    | null
    | Date
    | Timestamp
    | FieldValue
