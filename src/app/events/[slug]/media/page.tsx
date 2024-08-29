import { Grid } from '@radix-ui/themes';
import {
  Button,
  Caption,
  MediaIcon,
  Tabs,
  TabsList,
  TabsTrigger,
  Title,
} from '@vibepot/design-system';
import Link from 'next/link';

export default function Event() {
  return (
    <main className="flex flex-col p-20 gap-20">
      <div className="flex flex-row items-center">
        <Title variant="h5" className="text-white w-full">
          Monolink
        </Title>
      </div>
      <Tabs defaultValue="you">
        <TabsList>
          <TabsTrigger className="uppercase" value="you">
            You
          </TabsTrigger>
          <TabsTrigger className="uppercase" value="artist">
            Artist
          </TabsTrigger>
          <TabsTrigger className="uppercase" value="promoter">
            Promoter
          </TabsTrigger>
          <TabsTrigger className="uppercase" value="fans">
            Fans
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Caption className="uppercase text-grey-400">224 Media</Caption>
      <Grid columns="3" gap="3" width="auto">
        <Link href={`media/1`} className="h-[160px] md:h-[320px] bg-grey-900 rounded-m" />
        <Link href={`media/1`} className="h-[160px] md:h-[320px] bg-grey-900 rounded-m" />
        <Link href={`media/1`} className="h-[160px] md:h-[320px] bg-grey-900 rounded-m" />

        <Link href={`media/1`} className="h-[160px] md:h-[320px] bg-grey-900 rounded-m" />
        <Link href={`media/1`} className="h-[160px] md:h-[320px] bg-grey-900 rounded-m" />
        <Link href={`media/1`} className="h-[160px] md:h-[320px] bg-grey-900 rounded-m" />

        <Link href={`media/1`} className="h-[160px] md:h-[320px] bg-grey-900 rounded-m" />
        <Link href={`media/1`} className="h-[160px] md:h-[320px] bg-grey-900 rounded-m" />
        <Link href={`media/1`} className="h-[160px] md:h-[320px] bg-grey-900 rounded-m" />
      </Grid>

      <Button
        className="gap-12 w-fit fixed left-1/2 transform -translate-x-1/2 -translate-y-1/2 bottom-[48px]"
        variant="secondary"
      >
        <MediaIcon />
        Upload media
      </Button>
    </main>
  );
}
