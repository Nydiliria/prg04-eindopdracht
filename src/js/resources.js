import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Background: new ImageSource('./images/space_background_retry.jpg'),
    Playership: new ImageSource('./images/playership.png'),
    Asteroid: new ImageSource('./images/asteroid.png'),
    Bullet: new ImageSource('./images/bullet.png'),
    Healthpack: new ImageSource('./images/healthpack.png'),
    Blob: new ImageSource('./images/blob.webp'),
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }