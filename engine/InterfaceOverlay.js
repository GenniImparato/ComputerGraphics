var InterfaceOverlay =
{
	init()
	{
		this.bar = new Box3D(0.25, 0.5, 0, new TextureMaterial("health_energy_bar.png"));
		this.bar.setPosition(-0.7, -0.7, -0.1);
		this.bar.setRotation(0, 0, 90);

		//health bar
		this.healthBar = new Box3D(0.32, 0.8, 0, new SimpleMaterial(255, 0, 0, 150));
		this.healthBar.setPosition(-0.20, 0.07, 0);
		this.healthBar.setParent(this.bar);

		//energy bar
		this.energyBar = new Box3D(0.32, 0.8, 0, new SimpleMaterial(10, 100, 255, 150));
		this.energyBar.setPosition(0.21, 0.07, 0);
		this.energyBar.setParent(this.bar);

		this.gameOverScreen = new Box3D(2, 2, 0, new TextureMaterial("gameover.jpg"));
		this.gameOverScreen.setRotation(0, 0, 90);

		this.key = new Box3D(0.3, 0.5, 0, new TextureMaterial("key.png"));
		this.key.setPosition(-0.7, -0.4, 0);
		this.key.setRotation(0, 0, 90);

		//credists screens
		this.credits1  = new Box3D(0.4, 0.8, 0, new TextureMaterial("credits1.png"));
		this.credits1.setRotation(0, 0, 90);
		this.credits1.setPosition(0.5, 0.5, 0);

		this.credits2  = new Box3D(0.4, 0.8, 0, new TextureMaterial("credits2.png"));
		this.credits2.setRotation(0, 0, 90);
		this.credits2.setPosition(-0.5, -0.5, 0);

		//damage screen
		this.damage  = new Box3D(2, 2, 0, new TextureMaterial("damage.png"));
		this.damage.setRotation(0, 0, 90);
		this.damage.setPosition(0, 0, 0.1);
	},

	render()
	{
		//parallel projection
		viewMatrix = utils.identityMatrix();
		projectionMatrix = utils.identityMatrix();

		//update health and energy from player
		this.healthBar.setScale(0.32, 0.8*player.health, 0);
		this.energyBar.setScale(0.32, 0.8*player.energy, 0);

		if(player.damagedTime >= 0)
			this.damage.render();

		if(player.hasKey)
			this.key.render();

		

		this.healthBar.render();
		this.energyBar.render();
		this.bar.render();
	},

	renderGameOver()
	{
		//parallel projection
		viewMatrix = utils.identityMatrix();
		projectionMatrix = utils.identityMatrix();

		this.gameOverScreen.render();
	},

	renderCredits()
	{
		//parallel projection
		viewMatrix = utils.identityMatrix();
		projectionMatrix = utils.identityMatrix();

		this.credits1.render();
		this.credits2.render();
	},
}