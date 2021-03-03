const isProd = process.env.NODE_ENV === 'production';
const prodMachineURI = 'https://spotifyplaylistmaker.app';
const localMachineURI = 'http://localhost:3000/';

module.exports = {
   REDIRECT_URI: isProd ? prodMachineURI : localMachineURI,
};
