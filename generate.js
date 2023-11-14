const fs = require("fs");
const csv = require("csv-parser");

const csvFilePath = "data/source.csv"; // Replace with your CSV file path

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on("data", (row) => {
    const metadata = generateMetadata(row);
    saveMetadataAsJSON(metadata, row.id);
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  });

function generateMetadata(row) {
  // Modify this function based on your CSV structure and metadata requirements
  return {
    name: row.name,
    description: row.description,
    image: row.image_url,
    external_url: row.external_url,
    // Add more properties as needed
  };
}

function saveMetadataAsJSON(metadata, id) {
  const fileName = `output/${id}`; // Adjust the path as needed
  fs.writeFile(fileName, JSON.stringify(metadata, null, 2), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Metadata for ${metadata.name} saved.`);
  });
}
