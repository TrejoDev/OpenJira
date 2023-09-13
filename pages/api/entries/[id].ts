import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';

import { db } from '@/database';
import { Entry, IEntry } from '@/models';

type Data = 
    | { msg: string }
    | IEntry

export default function handler( req: NextApiRequest, res: NextApiResponse<Data> ) {

    const { id } = req.query;  // query: strings

    if( !mongoose.isValidObjectId( id ) ){
        res.status(400).json({ msg: 'invalid id' + id })
    }

    switch (req.method) {
        case 'PUT':
            return updateEntry( req, res )   
            
        case 'GET':
            return getEntry( req, res )

            case 'DELETE':                     ///// esto modificado
            return deleteEntry( req, res );
    
        default:
            res.status(400).json({ msg: 'Bad request' });
    }
}


const deleteEntry = async ( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    const { id } = req.query;   
 
    await db.connect();
    const entryDBTodelete = await Entry.findByIdAndDelete( id );
    await db.disconnect();
 
 
    if ( !entryDBTodelete ) {
        return res.status(400).json({msg: 'There is no entrance with that ID' + id });
    }
    
    return res.status(200).json( entryDBTodelete );
 
} 

const getEntry = async (req:NextApiRequest, res: NextApiResponse ) => {
    
    const { id } = req.query;

    await db.connect();
    const entryInDB = await Entry.findById( id );
    await db.disconnect();

    if ( !entryInDB ) {
        return res.status(400).json({ msg: 'There is no entrance with that ID: ' + id })
    }

    return res.status(200).json( entryInDB );

}




const updateEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {
    
    const { id } = req.query;

    await db.connect();

    const entryToUpdate = await Entry.findById( id );

    if ( !entryToUpdate ) {
        await db.disconnect();
        return res.status(400).json({ msg: 'There is no entrance with that ID: ' + id })
    }

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status,
    } = req.body;

    try {
        const updatedEntry = await Entry.findByIdAndUpdate( id, { description, status }, { runValidators: true, new: true });
        await db.disconnect();
        res.status(200).json( updatedEntry! );
        
    } catch (error: any) {
        await db.disconnect();
        res.status(400).json({ msg: error.errors.status.message });
    }
    // entryToUpdate.description = description;
    // entryToUpdate.status = status;
    // await entryToUpdate.save();
}