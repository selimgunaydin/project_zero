import { Log } from '../models/Log';
import { Model, Document } from 'mongoose';

export async function logModelOperation(
  action: 'create' | 'update' | 'delete',
  model: string,
  documentId: string | undefined,
  details: string,
  user?: string
) {
  try {
    await Log.create({
      action,
      model,
      documentId,
      details,
      user
    });
  } catch (error) {
    console.error('Error creating log:', error);
  }
}

export function addLoggingToModel<T extends Document>(model: Model<T>) {
  // Create middleware
  model.schema.pre('save', async function(next) {
    const isNew = this.isNew;
    const action = isNew ? 'create' : 'update';
    const details = `${action === 'create' ? 'Created' : 'Updated'} ${model.modelName} document`;
    
    await logModelOperation(
      action,
      model.modelName,
      this._id?.toString(),
      details
    );
    next();
  });

  // Delete middleware
  model.schema.pre('deleteOne', { document: true, query: false }, async function(next) {
    await logModelOperation(
      'delete',
      model.modelName,
      this._id?.toString(),
      `Deleted ${model.modelName} document`
    );
    next();
  });
} 