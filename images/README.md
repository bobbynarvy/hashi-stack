# VM image building

The goal of this component is to automate the building of VM images that will be the foundation of the rest of the project infrastructure. 

It will make use of [HashiCorp Packer](https://www.packer.io/) to build a VM image that shall have Hashicorp [Consul](https://www.consul.io), [Nomad](https://www.nomadproject.io/), and [Docker](https://www.docker.com/) installed. The resulting image shall also include related configuration base files that are useful for bootstrapping the necessary application binaries to their desired state and configuration.

The component makes use of [DigitalOcean](https://www.digitalocean.com/) resources and [Packer's DigitalOcean builder](https://www.packer.io/docs/builders/digitalocean) resulting image will be stored as a [DigitalOcean snapshot](https://www.digitalocean.com/docs/images/snapshots/).

## Requirements

- Hashicorp Packer v1.6+

## Usage

```bash
$ packer build template.json
```

By itself, the command above will warn that a DigitalOcean API token is missing. [Several options](https://www.packer.io/docs/templates/user-variables.html) exist as to how this can be set. The following are some ways to do so:

### From the command line

```bash
$ packer build -var 'api_token={token}' template.json
```

### As an environment variable

Set the `DIGITALOCEAN_API_TOKEN` environment variable with the token as the value.

## DigitalOcean snapshot

Once the image has been successfully created and saved as a DigitalOcean snapshot, it can then be used to create droplets.

Information about the snapshot that can be used in other components of this project can be obtained using the [DigitalOcean API](https://developers.digitalocean.com/documentation/v2/#snapshots). 