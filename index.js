import NodeYeelight from "node-yeelight-wifi";

const { Lookup, Yeelight } = NodeYeelight;

let look = new Lookup();

look.on("detected", async (light) => {
  console.log(
    `A new light has been detected: id=${light.id} name=${light.name}`
  );
});

setTimeout(async () => {
  const lights = look.getLights();
  let light = null;

  if (lights.length > 0) {
    console.log(`${lights.length} light(s) was found!`);
    light = lights[0];
  } else {
    console.log(`No lights were found!`);
  }

  // toggle light
  try {
    await light.setPower(!light.power);
  } catch (err) {
    console.log(err);
  }

  // listen to all events
  light.on("connected", () => {
    console.log("connected");
  });

  light.on("disconnected", () => {
    console.log("disconnected");
  });

  light.on("stateUpdate", (light) => {
    console.log(light.power);
  });

  light.on("failed", (error) => {
    console.log(error);
  });
}, 500);
