![Zodit WYSIWYG editor](https://raw.githubusercontent.com/xdan/zodit/master/examples/assets/logo.png)

# Docker environment for Zodit's contributors
All you need to build and test Zodit with a docker environment.

No installation required on the host except docker.

## Docker installation
Follow instructions on [docker website](https://docs.docker.com/get-docker/)

## Available commands
All commands must be executed in the "docker" directory
```bash
cd docker
```

### Installation of the docker environment for Zodit
```bash
./install
```

### To Run webpack Hot Reload server:
Ctrl+C to close this server.

To try Zodit, you can open up http://localhost:2000/ in your browser.
```bash
./start
```

### To build Zodit
The build files are in the "build" directory.
```bash
./build
```

### To launch tests of Zodit
To follow the tests, you can open up http://localhost:2002/ in your browser.
```bash
./test
```

### Uninstallation of the docker environment for Zodit
```bash
./uninstall
```
