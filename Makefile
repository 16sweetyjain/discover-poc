SERVICE_NAME=discoverservice
IMAGE_TAG=$(SERVICE_NAME)-img

default: ci

login:
ifeq ($(ARTIFACTORY_USER), )
	@echo "make sure that ARTIFACTORY_USER is set appropriately in your environment"
	exit 1
endif
ifeq ($(ARTIFACTORY_API_TOKEN), )
	@echo "make sure that ARTIFACTORY_API_TOKEN is set appropriately in your environment"
	exit 1
endif
	@echo docker login -u ARTIFACTORY_USER -p ARTIFACTORY_API_TOKEN docker-asr-release.dr.corp.adobe.com
	@docker login -u $(ARTIFACTORY_USER) -p $(ARTIFACTORY_API_TOKEN) docker-asr-release.dr.corp.adobe.com

# The image tag for ci will be different with BYOJ, see https://jira.corp.adobe.com/browse/EON-4685
# $sha is provided by jenkins
ci: IMAGE_TAG := $(if $(sha),$(IMAGE_TAG)-ci-$(sha),$(IMAGE_TAG))
ci: build
	echo "Success"

pre-deploy-build:
	echo "Nothing is defined in pre-deploy-build step"

build: login
	@docker build --pull \
		--build-arg ARTIFACTORY_USER --build-arg ARTIFACTORY_API_TOKEN \
		-t $(IMAGE_TAG) .

clean:
	rm -rf node_modules/ public/ coverage/

post-deploy-build:
	echo "Nothing is defined in post-deploy-build step"

clean-room:
	# Docker Clean Room setup - https://wiki.corp.adobe.com/x/khu5TQ
	sh clean-room.sh
