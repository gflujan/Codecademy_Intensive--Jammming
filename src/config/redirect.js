const isProd = process.env.NODE_ENV === 'production';
const prodMachineURI = 'https://gfl-jammming.herokuapp.com/';
const localMachineURI = 'http://localhost:3000/';

module.exports = {
   myRedirectUri: isProd ? prodMachineURI : localMachineURI,
};
