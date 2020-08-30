# Hashi-stack

This project serves as a project for learning and demonstrating how to implement a full-stack project using the HashiCorp stack.

## How it works

This project aims to implement a web-based infrastructure that implements the *infrastructure as code* concept. 
More specifically, the goal of this project is to deploy a containerized dummy web application by using modern 
deployment procedures (i.e. blue-green deployments) while making use of automated provisioning and configuration tools under the hood.

It is composed of the following components:

### Dummy application

A simple web application is provided with the goal of showing the user the unique ID of the application's server.
The goal here is to show that a load-balanced application setup can be achieved through the other infrastructure components.
The application is Dockerized and its image is stored using [GitHub packages](https://github.com/features/packages).

### VM image building

Reusable VM images will be built with [Packer](https://www.packer.io/) using its [DigitalOcean builder](https://www.packer.io/docs/builders/digitalocean). The resulting image will have [Consul](https://www.consul.io), [Nomad](https://www.nomadproject.io/) and [Docker](https://www.docker.com/) installed while configuration files will be included. The image will be stored as a [DigitalOcean snapshot](https://www.digitalocean.com/docs/images/snapshots/).

### Provisioning

The project infrastructure shall be provisioned using [Terraform](https://www.terraform.io/). Its goal is to provision:

- 6 [DigitalOcean droplets](https://www.digitalocean.com/products/droplets/) that make use of the image built using the procedure described previously.
  - 3 droplets are used as Consul and Nomad servers
  - 3 droplets are used as Consul and Nomad clients and are visible publicly through a [DigitalOcean load balancer](https://www.digitalocean.com/products/load-balancer/)
  - A [DigitalOcean cloud firewall](https://www.digitalocean.com/products/cloud-firewalls/) will be configured to restrict public access to the droplets
- a private network that enables the droplets to be visible to each other through a [DigitalOcean VPC](https://www.digitalocean.com/products/vpc/).
- a [Consul cluster](https://www.consul.io/docs/install/bootstrapping#creating-the-cluster) through the automated execution and configuration of the [Consul agent](https://www.consul.io/docs/agent)
- a [Nomad cluster](https://learn.hashicorp.com/tutorials/nomad/clustering) through the automated execution and configuration of the [Nomad agent](https://learn.hashicorp.com/tutorials/nomad/get-started-run), leveraging [Nomad's Consul integration](https://www.nomadproject.io/docs/integrations/consul-integration)

### Deployment

Once the infrastructure is provisioned, deployment of the dummy application is done by:

- starting several Docker container instances of the dummy application 
- provisioning of a [Fabio load balancer](https://fabiolb.net/) that routes external requests received by Nomad clients to instances of the deployed application containers.

These will be achieved by executing [Nomad jobs](https://learn.hashicorp.com/tutorials/nomad/get-started-jobs) that are launched through [Terraform's Nomad provider](https://registry.terraform.io/providers/hashicorp/nomad/latest/docs).