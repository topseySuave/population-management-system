import mongoose, { Schema } from 'mongoose';

const SubLocationSchema = new Schema({
  subLocationName: { type: String, required: true },
  maleTotalPopulationCount: { type: Number, default: 0 },
  femaleTotalPopulationCount: { type: Number, default: 0 },
  totalPopulationCount: { type: Number, default: 0 },
  parentId: { type: Schema.Types.ObjectId }
})

const LocationSchema = new Schema({
  name: { type: String, required: true },
  maleTotalPopulationCount: { type: Number, default: 0 },
  femaleTotalPopulationCount: { type: Number, default: 0 },
  totalPopulationCount: { type: Number, default: 0 },
  subLocations: [SubLocationSchema],
})

LocationSchema.methods.toJSON = function() {
  const locationObject = this.toObject();
  if (locationObject.subLocations.length) {
    delete locationObject.maleTotalPopulationCount;
    delete locationObject.femaleTotalPopulationCount;
    delete locationObject.totalPopulationCount;
    return locationObject;
  }
  delete locationObject.subLocations;
  return locationObject;
}

let Location = mongoose.model('location', LocationSchema)

export default Location;
