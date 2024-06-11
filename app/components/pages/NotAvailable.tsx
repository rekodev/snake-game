const NotAvailable = () => {
  return (
    <section className="my-auto flex w-full flex-1 flex-col justify-center gap-2 text-center">
      <h2 className="text-4xl font-bold">
        The <span className="text-primary">game</span> is only available on
        desktop
      </h2>
      <p className="text-lg font-medium text-neutral-400">
        Sorry for the inconvenience
      </p>
    </section>
  );
};

export default NotAvailable;
