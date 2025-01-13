import mongoose from 'mongoose';

const { Schema } = mongoose;

const statDataSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  value: { type: String, required: true },
  nameClass: { type: String, required: true },
  valueClass: { type: String, required: true },
});

const statsSchema = new Schema({
  containerClass: { type: String, required: true },
  innerContainerClass: { type: String, required: true },
  gridClass: { type: String, required: true },
  itemClass: { type: String, required: true },
  statData: [statDataSchema],
});

const StatsWidgetData = mongoose.models.stats_widget || mongoose.model('stats_widget', statsSchema);

export default StatsWidgetData;
