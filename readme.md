## RICHOUT Project API
Master branch is deployed to live. all test and development is done on development branch.
* create merge request to push to master from development.
### API Documentation
[https://documenter.getpostman.com/view/2497827/Rzn9tgyr]

#### DEPLOYMENT INSTRUCTIONS
Server is deployed on google cloud platform inside directory ...home/richout/richoutapi
Server is running as tmux process executed by the following command:
* ssh into the remote machine
* start tmux by typing tmux into the shell
* start node inside the started tmux session
* leave/detach the tmux session by typing Ctrl+B and then D
Check status of tmux by executing the following command in the shell:
* tmux attach
To run multiple sessions side by side,name each session by executing:
* Ctrl-B and $
to get list of currently running sessions, run:
* tmux list-sessions
Fore more info on tmux: "https://tmux.github.io/"

