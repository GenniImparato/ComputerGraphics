var InterfaceOverlay =
{
	init()
	{
		this.healthBarOverlay = new Box3D(0.2, 0.5, 0, new TextureMaterial("health_bar.png"));
		this.healthBarOverlay.setPosition(-0.7, -0.7, -0.1);
		this.healthBarOverlay.setRotation(0, 0, 90);
		this.healthBar = new Box3D(0.35, 0.65, 0, new SimpleMaterial(255, 0, 0, 150));
		this.healthBar.setPosition(0.22, 0.08, 0);
		//this.healthBar.setRotation(0, 0, -90);
		this.healthBar.setParent(this.healthBarOverlay);

		/*this.energyBar = new Box3D(0.3, 0.05, 0, new SimpleMaterial(0, 100, 255, 150));
		this.energyBar.setPosition(-0.65, -0.8, 0);*/
	},

	render()
	{
		//parallel
		viewMatrix = utils.identityMatrix();
		projectionMatrix = utils.identityMatrix();

		//this.energyBar.render();
		this.healthBar.render();
		this.healthBarOverlay.render();
	}
}