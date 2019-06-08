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
	},

	render()
	{
		//parallel projection
		viewMatrix = utils.identityMatrix();
		projectionMatrix = utils.identityMatrix();

		//update health and energy from player
		this.healthBar.setScale(0.32, 0.8*player.health, 0);
		this.energyBar.setScale(0.32, 0.8*player.energy, 0);

		//this.energyBar.render();
		this.healthBar.render();
		this.energyBar.render();
		this.bar.render();
	}
}